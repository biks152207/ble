package com.axle;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.sogilis.ReactNativeBluetooth.ReactNativeBluetoothPackage;
import com.horcrux.svg.SvgPackage;
import com.wheelpicker.WheelPickerPackage;
import com.smixx.fabric.FabricPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.microsoft.codepush.react.CodePush;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.transistorsoft.rnbackgroundgeolocation.RNBackgroundGeolocation;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.reactlibrary.RNPdfScannerPackage;
import com.mapbox.reactnativemapboxgl.ReactNativeMapboxGLPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.transistorsoft.rnbackgroundgeolocation.*;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;
import java.util.Arrays;
import java.util.List;
import com.rssignaturecapture.RSSignatureCapturePackage;
import it.innove.BleManagerPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new RNBackgroundGeolocation(),
            new MainReactPackage(),
            new ReactNativeBluetoothPackage(),
            new SvgPackage(),
            new WheelPickerPackage(),
            new FabricPackage(),
            new RNDeviceInfo(),
            new CodePush("seVrsdK75fngbzH9vT1evQTwDS0t7eb88151-88f6-4cf6-be3e-d93559f98525", MainApplication.this, BuildConfig.DEBUG),

            new RCTCameraPackage(),
          //  new BackgroundTaskPackage(),
          new ReactNativePushNotificationPackage(),
            new BackgroundTimerPackage(),
            new RNPdfScannerPackage(),
            new ReactNativeMapboxGLPackage(),
            new VectorIconsPackage(),
            new ImagePickerPackage(),
            new RSSignatureCapturePackage(),
            new BleManagerPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    Fabric.with(this, new Crashlytics());
    SoLoader.init(this, /* native exopackage */ false);
  }
}
