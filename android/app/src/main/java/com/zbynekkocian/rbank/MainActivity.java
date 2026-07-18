package com.zbynekkocian.rbank;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(BiometricNativePlugin.class);
        super.onCreate(savedInstanceState);
    }
}
