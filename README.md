# colby-confirm-component

A confirmation dialog box react component

## Usage

```javascript
import React from 'react';
import Confirm from '@colbycommunications/colby-confirm-component';

export default () => (
    <button
        type="button"
        className="btn btn-danger"  
        onClick={() => {
            Confirm({
                message: 'Are you absolutely sure?',
                description: 'You are about to delete one record',
                confirmLabel: 'Yes',
                abortLabel: 'No',
            })
                .then(() => {
                    // do something when 'Yes' has been pressed
                })
                .fail(() => {
                    // do something when 'No' has been pressed
                });
        }}
    >
        Delete
    </button>
);
```
