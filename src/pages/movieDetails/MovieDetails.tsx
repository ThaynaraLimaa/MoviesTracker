import { useLocation, useParams } from 'react-router-dom'
import MessageAlert from '../../components/UI/MessageAlert';
import { useEffect, useState } from 'react';
import ManuallyMovie from './ManuallyMovie';
import IMDbMovie from './IMDbMovie';


export default function MovieDetails() {
    const location = useLocation();
    const success = location.state ? location.state.success : false;
    const [showMessage, setShowMessage] = useState<boolean>(success); 7
    const { id } = useParams();
    const isIMDb = id?.startsWith("tt") ? true : false;

    // hide success pop-up after 2 seconds
    useEffect(() => {
        if (success) {
            setTimeout(() => {
                setShowMessage(false)
            }, 2000)
        } else {
            setShowMessage(false)
        }
    })

    return (
        <>
            {showMessage && <MessageAlert type='success' message='Success! The movie was added to your collection!' />}
            {isIMDb ? <IMDbMovie id={id as string} /> : <ManuallyMovie id={id as string} />}

        </>
    )
} 