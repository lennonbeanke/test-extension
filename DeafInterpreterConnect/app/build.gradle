plugins {
    id 'com.android.application'
    id 'com.google.gms.google-services'
}

android {
    namespace 'com.deafconnect.interpreter'
    compileSdk 34

    defaultConfig {
        applicationId "com.deafconnect.interpreter"
        minSdk 24
        targetSdk 34
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}

dependencies {
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.11.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    implementation 'androidx.recyclerview:recyclerview:1.3.2'
    implementation 'androidx.cardview:cardview:1.0.0'

    // Agora Video SDK - handles the actual live video call between deaf user and interpreter
    implementation 'io.agora.rtc:full-sdk:4.2.6'

    // Firebase - used to track which interpreters are online and to broadcast urgent call requests
    implementation platform('com.google.firebase:firebase-bom:32.7.0')
    implementation 'com.google.firebase:firebase-database'
    implementation 'com.google.firebase:firebase-auth'

    // Location - so the interpreter can see where the urgent call is coming from
    implementation 'com.google.android.gms:play-services-location:21.1.0'
}
