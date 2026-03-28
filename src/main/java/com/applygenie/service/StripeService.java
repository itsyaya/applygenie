package com.applygenie.service;

import com.applygenie.entity.User;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;

public interface StripeService {
    Session createCheckoutSession(User user, String priceId) throws StripeException;
    void handleWebhook(String payload, String sigHeader) throws Exception;
}
