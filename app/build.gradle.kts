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
        versionCode = 7
        versionName = "0.6.1"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
        }
    }
}
