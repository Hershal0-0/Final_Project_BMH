import React from 'react'
import PropTypes from 'prop-types'

// Importting Redux Requirements
import { connect } from 'react-redux'


const Trial = ({trial:{name}}) => {
    return (
        <div>
            {name}
        </div>
    )
}

Trial.propTypes ={
    trial: PropTypes.object.isRequired,
}

const mapStateToProps= state =>({
    trial:state.trial
})
export default connect(mapStateToProps)(Trial)
