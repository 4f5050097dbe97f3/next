import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Redirect = ({ path }) => {

    const router = useRouter()

    useEffect(() => { router.push(path) }, [router])

    return null

}

export default Redirect
