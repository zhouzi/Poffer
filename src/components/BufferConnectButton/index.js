import React from 'react';
import openPopup from 'openPopup';

const { client_id, redirect_uri } = window.__env__.buffer;

export default function BufferConnectButton () {
  function openBufferConnectPopup () {
    openPopup(`https://bufferapp.com/oauth2/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code`);
  }

  return (
    <button type="button" onClick={openBufferConnectPopup}>
      Connect Buffer
    </button>
  );
};
