//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import {connect} from 'react-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/shell';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';

const COMPONENT_NAME = 'Overlay';

/**
 * Overlay component
 * @class Overlay
 * @example <Overlay
 *  type='share'
 *  onClose={() => this.closeShareOverlay()}
 * >
 *  ...
 * </Overlay>
 * @extends {Component}
 */
@connect(null, bindActions(actions))
class Overlay extends Component {
  _timeoutId: ?TimeoutID = null;
  /**
   * componentWillMount
   *
   * @returns {void}
   * @memberof Overlay
   */
  componentDidMount(): void {
    this._timeoutId = setTimeout(() => this.props.addPlayerClass(style.overlayActive), 0);
  }

  /**
   * componentWillUnmount
   *
   * @returns {void}
   * @memberof Overlay
   */
  componentWillUnmount(): void {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
      this._timeoutId = null;
    }
    this.props.removePlayerClass(style.overlayActive);
  }

  /**
   * closeButton
   * @param {any} props - props
   * @returns {React$Element | void} close button element
   * @memberof Overlay
   */
  renderCloseButton(props: any): React$Element<any> | void {
    if (!props.permanent) {
      return (
        <Localizer>
          <a
            role="button"
            ref={el => {
              if (props.addAccessibleChild) {
                props.addAccessibleChild(el);
              }
            }}
            tabIndex="0"
            onClick={() => props.onClose()}
            onKeyDown={e => {
              if (e.keyCode === KeyMap.ENTER) {
                e.preventDefault();
                props.onClose();
              }
            }}
            aria-label={<Text id="overlay.close" />}
            className={style.closeOverlay}>
            <Icon type={IconType.Close} />
          </a>
        </Localizer>
      );
    } else {
      return undefined;
    }
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component
   * @memberof Overlay
   */
  render(props: any): React$Element<any> {
    const overlayClass = [style.overlay];
    if (props.type) overlayClass.push(style[props.type + '-overlay']);
    if (props.open) overlayClass.push(style.active);

    return (
      <div
        tabIndex="-1"
        className={overlayClass.join(' ')}
        role="dialog"
        onKeyDown={e => {
          if (props.handleKeyDown) {
            props.handleKeyDown(e);
          }
        }}>
        <div className={style.overlayContents}>{props.children}</div>
        {this.renderCloseButton(props)}
      </div>
    );
  }
}

Overlay.displayName = COMPONENT_NAME;
export {Overlay};
