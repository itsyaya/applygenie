package com.applygenie.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping(value = "/", produces = "text/html")
    public String home() {
        return """
            <html>
                <body style="font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; background-color: #f0f2f5;">
                    <div style="padding: 2rem; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center;">
                        <h1 style="color: #1a73e8; margin-top: 0;">🚀 ApplyGenie Backend is RUNNING</h1>
                        <p style="color: #5f6368; font-size: 1.1rem;">The server is successfully started on <b>port 8080</b>.</p>
                        <div style="margin-top: 1.5rem; padding: 1rem; background: #e8f0fe; border-radius: 8px;">
                            <p style="margin: 0; font-weight: bold;">Available Tools:</p>
                            <ul style="text-align: left; margin-top: 0.5rem;">
                                <li><a href="/h2-console" style="color: #1a73e8; text-decoration: none;">Database Console (H2)</a></li>
                            </ul>
                        </div>
                    </div>
                </body>
            </html>
            """;
    }
}
