import React, {
  useState,
  useEffect,
  MouseEvent,
  SetStateAction,
  Dispatch,
} from 'react';

const PwaButton = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall]: [
    Event | null,
    Dispatch<SetStateAction<Event | null>>
  ] = useState<Event | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      console.log('we are being triggered :D');
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const onClick = (evt: MouseEvent<HTMLDivElement>) => {
    evt.preventDefault();
    if (promptInstall) {
      (promptInstall as any).prompt();
    }
  };

  if (!supportsPWA) {
    return null;
  }

  return (
    <div className="area">
      <div className="btn-area" onClick={onClick}>
        <img src="share.png" alt="シェアボタン" className="image-area" />
        <div className="text-area">
          ホームに
          <br />
          追加
        </div>
      </div>
    </div>
  );
};

export default PwaButton;
