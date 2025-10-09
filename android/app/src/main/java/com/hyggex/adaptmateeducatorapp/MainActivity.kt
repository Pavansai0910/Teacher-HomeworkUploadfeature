package com.hyggex.adaptmateeducatorapp

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.os.Bundle // Import Bundle

class MainActivity : ReactActivity() {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    override fun getMainComponentName(): String = "App"

    // ------------------------------------------------------------------
    // ADD THIS OVERRIDE TO FIX THE react-native-screens CRASH
    // ------------------------------------------------------------------
    override fun onCreate(savedInstanceState: Bundle?) {
        // If savedInstanceState is not null, it means the activity is being restored.
        // We pass 'null' to super.onCreate() to prevent fragment restoration, as required
        // by react-native-screens.
        super.onCreate(if (savedInstanceState != null) null else savedInstanceState)
    }
    // ------------------------------------------------------------------

    /**
     * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
     * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}