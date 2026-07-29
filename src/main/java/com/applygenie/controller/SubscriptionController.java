package com.applygenie.controller;

import com.applygenie.config.properties.StripeProperties;
import com.applygenie.dto.response.ApiResponse;
import com.applygenie.entity.User;
import com.applygenie.security.CurrentUserService;
import com.applygenie.service.StripeService;
import com.stripe.model.checkout.Session;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@Slf4j
public class SubscriptionController {

    private final StripeService stripeService;
    private final CurrentUserService currentUserService;
    private final StripeProperties stripeProperties;

    @PostMapping("/create-checkout-session")
    public ResponseEntity<ApiResponse<String>> createCheckoutSession() {
        User user = currentUserService.getCurrentUser();
        try {
            Session session = stripeService.createCheckoutSession(user, stripeProperties.price().pro());
            return ResponseEntity.ok(ApiResponse.success("Checkout session created", session.getUrl()));
        } catch (Exception e) {
            log.error("Stripe session creation failed", e);
            return ResponseEntity.internalServerError().body(ApiResponse.error("Unable to create checkout session"));
        }
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> handleWebhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {
        try {
            stripeService.handleWebhook(payload, sigHeader);
            return ResponseEntity.ok("Webhook handled");
        } catch (Exception e) {
            log.error("Webhook processing failed", e);
            return ResponseEntity.badRequest().body("Webhook error: " + e.getMessage());
        }
    }
}
