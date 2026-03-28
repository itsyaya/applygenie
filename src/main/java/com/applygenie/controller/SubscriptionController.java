package com.applygenie.controller;

import com.applygenie.dto.response.ApiResponse;
import com.applygenie.entity.User;
import com.applygenie.repository.UserRepository;
import com.applygenie.security.CustomUserDetails;
import com.applygenie.service.StripeService;
import com.stripe.model.checkout.Session;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@Slf4j
public class SubscriptionController {

    private final StripeService stripeService;
    private final UserRepository userRepository;

    @Value("${stripe.price.pro}")
    private String proPriceId;

    @PostMapping("/create-checkout-session")
    public ResponseEntity<ApiResponse<String>> createCheckoutSession() {
        User user = getCurrentUser();
        try {
            Session session = stripeService.createCheckoutSession(user, proPriceId);
            return ResponseEntity.ok(new ApiResponse<>(true, "Checkout session created", session.getUrl()));
        } catch (Exception e) {
            log.error("Stripe session creation failed", e);
            return ResponseEntity.internalServerError().body(new ApiResponse<>(false, e.getMessage(), null));
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

    private User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = ((CustomUserDetails) principal).getUsername();
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
