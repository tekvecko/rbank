package com.zbynekkocian.rbank;

import androidx.annotation.NonNull;
import androidx.biometric.BiometricPrompt;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.FragmentActivity;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.util.concurrent.Executor;

@CapacitorPlugin(name = "BiometricNative")
public class BiometricNativePlugin extends Plugin {

    @PluginMethod
    public void authenticate(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            Executor executor = ContextCompat.getMainExecutor(getContext());
            
            BiometricPrompt biometricPrompt = new BiometricPrompt((FragmentActivity) getActivity(),
                    executor, new BiometricPrompt.AuthenticationCallback() {
                
                @Override
                public void onAuthenticationError(int errorCode, @NonNull CharSequence errString) {
                    super.onAuthenticationError(errorCode, errString);
                    call.reject(errString.toString());
                }

                @Override
                public void onAuthenticationSucceeded(@NonNull BiometricPrompt.AuthenticationResult result) {
                    super.onAuthenticationSucceeded(result);
                    JSObject ret = new JSObject();
                    ret.put("success", true);
                    call.resolve(ret);
                }

                @Override
                public void onAuthenticationFailed() {
                    super.onAuthenticationFailed();
                    // Nevoláme reject, systém sám umožní další pokus
                }
            });

            BiometricPrompt.PromptInfo promptInfo = new BiometricPrompt.PromptInfo.Builder()
                    .setTitle("Přihlášení k rBank")
                    .setSubtitle("Použijte biometrický údaj")
                    .setNegativeButtonText("Použít S-PIN")
                    .build();

            biometricPrompt.authenticate(promptInfo);
        });
    }
}
