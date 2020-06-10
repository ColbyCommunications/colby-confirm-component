/* eslint-disable no-return-assign */
import PropTypes from 'prop-types';
import React from 'react';

// TODO: rewrite it without jQuery and Bootstrap modal
// jQuery has to be global for Bootstrap
let JQ;

if (window.jQuery) {
    JQ = window.jQuery;
} else {
    JQ = require('jquery'); // eslint-disable-line global-require
    window.$ = JQ;
    window.jQuery = JQ;
}
if (!$().modal) {
    require('bootstrap'); // eslint-disable-line global-require
}

const Promise = $.Deferred;

export default class ConfirmModal extends React.Component {
    static propTypes = {
        message: PropTypes.node,
        description: PropTypes.node,
        confirmLabel: PropTypes.string,
        abortLabel: PropTypes.string,
    };

    static defaultProps = {
        message: 'Are you sure?',
        description: '',
        confirmLabel: 'Yes',
        abortLabel: 'No',
    };

    componentDidMount() {
        this.promise = new Promise();

        $(this.modal).modal({ backdrop: 'static' });
    }

    abort = () => {
        const $this = this;

        const node = $(this.modal);
        node.on('hidden.bs.modal', () => {
            $this.promise.reject();
        });
        node.modal('hide');
    };

    confirm = () => {
        const $this = this;

        const node = $(this.modal);
        node.on('hidden.bs.modal', () => {
            $this.promise.resolve();
        });
        node.modal('hide');
    };

    render() {
        let body = null;
        if (this.props.description) {
            body = <div className="modal-body">{this.props.description}</div>;
        }

        return (
            <div
                className="modal fade"
                tabIndex="-1"
                role="dialog"
                ref={element => (this.modal = element)}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.props.message}</h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={this.abort}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">{body}</div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={this.abort}
                            >
                                {this.props.abortLabel}
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.confirm}
                            >
                                {this.props.confirmLabel}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
