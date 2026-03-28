package com.applygenie.service.impl;

import com.applygenie.entity.SubscriptionTier;
import com.applygenie.entity.User;
import com.applygenie.repository.UserRepository;
import com.applygenie.service.StripeService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.StripeObject;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class StripeServiceImpl implements StripeService {

    private final UserRepository userRepository;

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @Value("${stripe.webhook.secret}")
    private String webhookSecret;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }

    @Override
    public Session createCheckoutSession(User user, String priceId) throws StripeException {
        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
                .setSuccessUrl("http://localhost:5173/dashboard?status=success")
                .setCancelUrl("http://localhost:5173/dashboard?status=cancel")
                .setCustomerEmail(user.getEmail())
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setPrice(priceId)
                        .setQuantity(1L)
                        .build())
                .setClientReferenceId(user.getId().toString())
                .build();

        return Session.create(params);
    }

    @Override
    public void handleWebhook(String payload, String sigHeader) throws Exception {
        Event event = Webhook.constructEvent(payload, sigHeader, webhookSecret);
        
        log.info("Received Stripe Webhook event: {}", event.getType());

        EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
        if (dataObjectDeserializer.getObject().isEmpty()) {
            throw new RuntimeException("Stripe Webhook deserialization failed");
        }
        StripeObject stripeObject = dataObjectDeserializer.getObject().get();

        switch (event.getType()) {
            case "checkout.session.completed":
                handleCheckoutSessionCompleted((Session) stripeObject);
                break;
            case "customer.subscription.deleted":
                handleSubscriptionDeleted((com.stripe.model.Subscription) stripeObject);
                break;
            default:
                log.info("Unhandled event type: {}", event.getType());
        }
    }

    private void handleCheckoutSessionCompleted(Session session) {
        String userIdStr = session.getClientReferenceId();
        if (userIdStr != null) {
            Long userId = Long.parseLong(userIdStr);
            userRepository.findById(userId).ifPresent(user -> {
                user.setStripeCustomerId(session.getCustomer());
                user.setSubscriptionTier(SubscriptionTier.PRO);
                user.setSubscriptionActive(true);
                userRepository.save(user);
                log.info("User {} upgraded to PRO tier via Stripe", user.getEmail());
            });
        }
    }

    private void handleSubscriptionDeleted(com.stripe.model.Subscription subscription) {
        String customerId = subscription.getCustomer();
        userRepository.findByStripeCustomerId(customerId).ifPresent(user -> {
            user.setSubscriptionTier(SubscriptionTier.FREE);
            user.setSubscriptionActive(false);
            userRepository.save(user);
            log.info("User {} subscription canceled, downgraded to FREE", user.getEmail());
        });
    }
}
