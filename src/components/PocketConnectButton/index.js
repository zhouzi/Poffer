import React from 'react';
import openPopup from 'openPopup';

export default function PocketConnectButton () {
  function openPocketConnectPopup () {
    openPopup('https://google.com');
  }

  return (
    <button type="button" onClick={openPocketConnectPopup}>
      Connect Pocket
    </button>
  );
};
