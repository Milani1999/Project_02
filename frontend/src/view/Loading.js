import Spinner from 'react-bootstrap/Spinner';

function Loading() {
    return (
        <Spinner animation="border" variant="success" style={{width:'30px',height:'30px',marginTop:'10px'}} />
    )
}

export default Loading;