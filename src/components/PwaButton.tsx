import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const PwaButton = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    });
  }, []);

  const onInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      setDeferredPrompt(null);
      setIsInstallable(false);
    } else {
      setIsInstallable(true);
    }
  };

  return isInstallable ? (
    <div className="area">
      <div className="btn-area" onClick={() => void onInstallClick()}>
        <img src="share.png" alt="シェアボタン" className="image-area" />
        <div className="text-area">
          ホームに
          <br />
          追加
        </div>
      </div>
    </div>
  ) : null;
};

export default PwaButton;
