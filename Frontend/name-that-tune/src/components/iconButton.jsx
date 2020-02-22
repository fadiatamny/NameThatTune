import React from 'react'

function iconButton() {
    return (
        <i v-else class="icon material-icons"
            v-text={props.iconName}
        />
    )
}

export default iconButton
