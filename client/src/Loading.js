import React from 'react'
import './loading.css'

function loading(props) {
    return (
        <div className="loading">
            <div class="spinner-grow text-success" role="status">
                <span class="visually-hidden ml-5">{props.text}</span>
            </div>
        </div>
    )
}

export default loading
