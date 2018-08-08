import React, { Component } from 'react';
import styles from './styles.css';
import TableIcon from './TableIcon';

export default class TableAdd extends Component {
  static defaultProps = {
    maxRow: 8,
    maxCol: 8,
  }
  // Start the popover closed
  state = {
    open: false,
    row: 1,
    col: 1,
  };

  // When the popover is open and users click anywhere on the page,
  // the popover should close
  componentDidMount() {
    document.addEventListener('click', this.closePopover);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closePopover);
  }

  // Note: make sure whenever a click happens within the popover it is not closed
  onPopoverClick = () => {
    this.preventNextClose = true;
    this.addTable();
    this.setState({
      row: 1,
      col: 1,
    });
    this.closePopover();
  };

  getPos = (event) => {
    // const obj = event.target;
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;
    let row = Math.ceil(x / 18);
    let col = Math.ceil(y / 18);
    const { maxRow, maxCol } = this.props;
    if (row > maxRow) {
      row = this.state.row;
    }
    if (col > maxCol) {
      col = this.state.col;
    }
    this.setState({ row, col });
  }

  openPopover = () => {
    if (!this.state.open) {
      this.preventNextClose = true;
      this.setState({
        open: true,
      });
    }
  };

  closePopover = () => {
    if (!this.preventNextClose && this.state.open) {
      this.setState({
        open: false,
      });
    }

    this.preventNextClose = false;
  };

  addTable = () => {
    const { editorState, onChange } = this.props;
    onChange(
      this.props.modifier(editorState, {
        columns: this.state.col,
        rows: this.state.row,
      })
    );
  };

  render() {
    const popoverClassName = this.state.open
      ? styles.addTablePopover
      : styles.addTableClosedPopover;
    const { maxRow, maxCol } = this.props;
    const { row, col } = this.state;
    const addRow = maxRow === row ? 0 : 1;
    const addCol = maxCol === col ? 0 : 1;
    const wrapperW = (row + addRow) * 20;
    const wrapperH = ((col + addCol) * 20) + 25;
    const wrapperStyle = { width: wrapperW < 80 ? 80 : wrapperW, height: wrapperH < 105 ? 105 : wrapperH };

    const unhighlightW = (row + addRow) * 18;
    const unhighlightH = (col + addCol) * 18;
    const unhighlightStyle = { width: unhighlightW < 72 ? 72 : unhighlightW, height: unhighlightH < 72 ? 72 : unhighlightH };
    return (
      <div className={styles.addTable}>
        <a onClick={this.openPopover} style={{ cursor: 'pointer' }}>
          {!this.props.children && <TableIcon />}
        </a>
        <div
          className={popoverClassName}
          onClick={this.onPopoverClick}
          onMouseMove={this.getPos}
          style={wrapperStyle}
        >
          <div style={unhighlightStyle} className={styles.unhighlight} />
          <div style={{ width: row * 18, height: col * 18 }} className={styles.highlight} />
          <div className={styles.label}>{row} x {col}</div>
        </div>
      </div>
    );
  }
}
