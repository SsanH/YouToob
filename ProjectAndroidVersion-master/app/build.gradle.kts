    plugins {
        alias(libs.plugins.android.application)
}

android {
    namespace = "com.example.youtube"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.example.youtube"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
}

dependencies {
//    implementation("libs.room.common")
//    implementation("libs.room.runtime")
//
    val roomVersion = "2.4.3" // Use the latest version available

    implementation("androidx.room:room-runtime:$roomVersion")
    annotationProcessor("androidx.room:room-compiler:$roomVersion")
    // Optional - Add Kotlin Extensions and Coroutines support for Room
    implementation("androidx.room:room-ktx:$roomVersion")


    implementation ("com.github.bumptech.glide:glide:4.13.0")
    annotationProcessor( "com.github.bumptech.glide:compiler:4.13.0")
    implementation("com.squareup.retrofit2:retrofit:2.9.0")
    implementation("com.squareup.retrofit2:converter-gson:2.5.0")
    implementation(libs.appcompat)
    implementation(libs.material)
    implementation(libs.activity)
    implementation ("com.google.code.gson:gson:2.9.0")
    implementation(libs.constraintlayout)
    testImplementation(libs.junit)
    androidTestImplementation(libs.ext.junit)
    androidTestImplementation(libs.espresso.core)
}