//@flow
import style from '../styles/style.scss';
import {h} from 'preact';
import {OverlayAction} from '../components/overlay-action';
import {PrePlaybackPlayOverlay} from '../components/pre-playback-play-overlay';
import {Loading} from '../components/loading';
import {SeekBarPlaybackContainer} from '../components/seekbar-playback-container';
import {VolumeControl} from '../components/volume';
import {TimeDisplayPlaybackContainer} from '../components/time-display-playback-container';
import {BottomBar} from '../components/bottom-bar';
import {OverlayPortal} from '../components/overlay-portal';
import {KeyboardControl} from '../components/keyboard';
import {UnmuteIndication} from '../components/unmute-indication';
import {Backdrop} from '../components/backdrop/backdrop';
import {PlaybackControls} from '../components/playback-controls';
import {PlaylistCountdown} from '../components/playlist-countdown';
import {PlaylistNextScreen} from '../components/playlist-next-screen';
import {VoaAudioDownloadControl} from '../components/voa-audio-download';

/**
 * Playback ui interface
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element} player ui tree
 */
export function voaAudioUi(props: any): React$Element<any> {
  return (
    <div className={style.playbackGuiWWrapper}>
      <KeyboardControl player={props.player} config={props.config} />
      <Loading player={props.player} />
      <div className={style.playerGui} id="player-gui">
        <OverlayPortal />
        <UnmuteIndication player={props.player} />
        <OverlayAction player={props.player} />
        <PlaybackControls player={props.player} />
        {PlaylistNextScreen.shouldRender(props) ? <PlaylistNextScreen player={props.player} /> : undefined}
        <BottomBar>
          <SeekBarPlaybackContainer showTimeBubble player={props.player} playerContainer={props.playerContainer} />
          <div className={style.leftControls}>
            <PlaybackControls player={props.player} />
            <TimeDisplayPlaybackContainer format="current / total" />
          </div>
          <div className={style.rightControls}>
            <VolumeControl player={props.player} />
            <VoaAudioDownloadControl player={props.player} />
          </div>
        </BottomBar>
      </div>
      {PlaylistCountdown.shouldRender(props) ? <PlaylistCountdown player={props.player} /> : undefined}
      <PrePlaybackPlayOverlay player={props.player} />
      <Backdrop />
    </div>
  );
}
