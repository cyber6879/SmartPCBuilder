package com.ikun.smartpc;

import android.app.Activity;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class MainActivity extends Activity {
    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        webView = new WebView(this);
        setContentView(webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(false);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setCacheMode(WebSettings.LOAD_NO_CACHE);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                if (url != null && url.startsWith("file:///android_asset/index.html")) {
                    injectRuntimePacks(view);
                }
            }
        });
        webView.setWebChromeClient(new WebChromeClient());
        webView.addJavascriptInterface(new NativeBridge(), "AndroidBridge");
        webView.loadUrl("file:///android_asset/index.html");
    }

    private void injectRuntimePacks(WebView view) {
        String js =
            "(function(){" +
            "if(window.__smartpcRuntimeStarted)return;window.__smartpcRuntimeStarted=true;" +
            "var files=['catalog-extra-v061.js','catalog-domestic-v061.js','evidence-normalize-v061.js','market-prices-v061.js','market-domestic-v061.js','v061-hotfix.js','v062-core.js'];" +
            "function load(i){" +
              "if(i>=files.length){if(window.__bootV062)window.__bootV062();return;}" +
              "var s=document.createElement('script');s.src=files[i]+'?v=062';" +
              "s.onload=function(){load(i+1)};" +
              "s.onerror=function(){console.error('Failed to load '+files[i]);load(i+1)};" +
              "document.body.appendChild(s);" +
            "}" +
            "load(0);" +
            "})();";
        view.evaluateJavascript(js, null);
    }

    public class NativeBridge {
        @JavascriptInterface
        public void openExternal(String url) {
            runOnUiThread(() -> {
                try { startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url))); }
                catch (Exception ignored) { }
            });
        }

        @JavascriptInterface
        public void openShop(String platform, String query) {
            runOnUiThread(() -> openShoppingApp(platform, query));
        }

        @JavascriptInterface
        public void vibrate(int milliseconds) {
            runOnUiThread(() -> vibrateOnce(Math.max(8, Math.min(milliseconds, 80))));
        }

        @JavascriptInterface
        public void setOrientation(String mode) {
            runOnUiThread(() -> {
                switch (mode) {
                    case "portrait": setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT); break;
                    case "landscape": setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE); break;
                    default: setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED); break;
                }
            });
        }
    }

    private void vibrateOnce(int ms) {
        try {
            Vibrator vibrator = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
            if (vibrator == null || !vibrator.hasVibrator()) return;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                vibrator.vibrate(VibrationEffect.createOneShot(ms, VibrationEffect.DEFAULT_AMPLITUDE));
            } else {
                vibrator.vibrate(ms);
            }
        } catch (Exception ignored) { }
    }

    private void openShoppingApp(String platform, String query) {
        String pkg;
        String url;
        String label;
        String encoded = URLEncoder.encode(query == null ? "" : query, StandardCharsets.UTF_8);
        switch (platform) {
            case "jd":
                pkg = "com.jingdong.app.mall";
                url = "https://search.jd.com/Search?keyword=" + encoded;
                label = "京东";
                break;
            case "taobao":
                pkg = "com.taobao.taobao";
                url = "https://s.taobao.com/search?q=" + encoded;
                label = "淘宝";
                break;
            case "pdd":
                pkg = "com.xunmeng.pinduoduo";
                url = "https://mobile.yangkeduo.com/search_result.html?search_key=" + encoded;
                label = "拼多多";
                break;
            default:
                return;
        }

        copyToClipboard(query);
        try {
            Intent deep = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
            deep.setPackage(pkg);
            deep.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(deep);
            return;
        } catch (Exception ignored) { }

        try {
            Intent launch = getPackageManager().getLaunchIntentForPackage(pkg);
            if (launch != null) {
                launch.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                startActivity(launch);
                Toast.makeText(this, "已打开" + label + "，型号已复制，可粘贴搜索", Toast.LENGTH_SHORT).show();
                return;
            }
        } catch (Exception ignored) { }

        try {
            startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url)));
            Toast.makeText(this, "未检测到" + label + " App，已改用浏览器", Toast.LENGTH_SHORT).show();
        } catch (Exception ignored) { }
    }

    private void copyToClipboard(String text) {
        if (text == null || text.trim().isEmpty()) return;
        ClipboardManager clipboard = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
        if (clipboard != null) clipboard.setPrimaryClip(ClipData.newPlainText("hardware-model", text));
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) webView.goBack();
        else super.onBackPressed();
    }
}
