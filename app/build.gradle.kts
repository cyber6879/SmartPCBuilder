plugins {
    id("com.android.application")
}

android {
    namespace = "com.ikun.smartpc"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.ikun.smartpc"
        minSdk = 24
        targetSdk = 35
        versionCode = 4
        versionName = "0.4.0"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
        }
    }
}
