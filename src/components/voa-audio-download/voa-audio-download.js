//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {Localizer} from 'preact-i18n';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/settings';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isMobile: state.shell.isMobile,
  isLive: state.engine.isLive
});

@connect(
  mapStateToProps,
  bindActions(actions)
)

/**
 * VoaAudioDownloadControl Component
 *
 * @class VoaAudioDownloadControl
 * @extends {BaseComponent}
 */
class VoaAudioDownloadControl extends BaseComponent {
  state: Object;
  _controlAudioDownloadElement: any;

  /**
   * Creates and instance of VoaAudioDownloadControl.
   * @param {Object} obj obj
   * @memberOf VoaAudioDownloadControl
   */
  constructor(obj: Object) {
    super({name: 'Download', player: obj.player});
  }

  /**
   * before component mounted, set initial state
   *
   * @returns {void}
   * @memberOf VoaAudioDownloadControl
   */
  componentWillMount(): void {
    this.setState({smartContainerOpen: false});
  }

  /**
   * after component mounted listen for click outside of component
   *
   * @returns {void}
   * @memberOf VoaAudioDownloadControl
   */
  componentDidMount(): void {
    // this.eventManager.listen(document, 'click', e => this.handleClickOutside(e));
  }

  /**
   * toggle smart container internal state on click
   *
   * @returns {void}
   * @memberOf VoaAudioDownloadControl
   */
  onDownloadButtonClick(): void {
    let speed = 'low';
    if (navigator.connection) {
      let effectiveConnection = navigator.connection.effectiveType;
      switch (effectiveConnection) {
        case 'slow-2g':
          speed = 'low';
          break;
        case '2g':
          speed = 'low';
          break;
        case '3g':
          speed = 'med';
          break;
        case '4g':
          speed = 'high';
          break;
      }
    }
    location.href = '/audio/download/' + this.player.getMediaInfo().entryId + '/' + speed;
  }

  /**
   * Render the component.
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberOf VoaAudioDownloadControl
   */
  render(props: any): React$Element<any> | void {
    let restrictedContent = this.player.config.flowParseRestrictedIdentifier || false;
    if (props.isLive || restrictedContent) return undefined;
    return (
      <div ref={c => (this._controlAudioDownloadElement = c)} className={style.controlButtonContainer}>
        <Localizer>
          <button tabIndex="0" aria-label="Download" className={style.controlButton} onClick={() => this.onDownloadButtonClick()}>
            <Icon type={IconType.ArrowDown} />
          </button>
        </Localizer>
      </div>
    );
  }
}

export {VoaAudioDownloadControl};
