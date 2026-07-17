package com.zbynekkocian.rbank;

import android.hardware.biometrics.BiometricPrompt;
import android.os.CancellationSignal;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "BiometricPlugin")
public class BiometricPlugin extends Plugin {

    @PluginMethod
    public void authenticate(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            BiometricPrompt.Builder builder = new BiometricPrompt.Builder(getContext())
                    .setTitle("Přihlášení k rBank")
                    .setDescription("Přiložte prst na senzor pro ověření identity")
                    .setNegativeButton("Použít S-PIN", getContext().getMainExecutor(), (dialog, which) -> {
                        call.reject("Zrušeno uživatelem - vynucen PIN");
                    });

            BiometricPrompt biometricPrompt = builder.build();
            CancellationSignal cancellationSignal = new CancellationSignal();

            biometricPrompt.authenticate(cancellationSignal, getContext().getMainExecutor(), new BiometricPrompt.AuthenticationCallback() {
                @Override
                public void onAuthenticationSucceeded(BiometricPrompt.AuthenticationResult result) {
                    super.onAuthenticationSucceeded(result);
                    JSObject ret = new JSObject();
                    ret.put("success", true);
                    call.resolve(ret);
                }

                @Override
                public void onAuthenticationError(int errorCode, CharSequence errString) {
                    super.onAuthenticationError(errorCode, errString);
                    call.reject(errString.toString());
                }
            });
        });
    }
}
