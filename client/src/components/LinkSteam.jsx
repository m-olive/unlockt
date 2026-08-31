import { useState } from 'react';
import { link, doImport } from '../services/steam';

function LinkSteam() {
    const [profileInput, setProfileInput] = useState('');
    const [errors, setErrors] = useState([]);
    const [pending, setPending] = useState(false);
    const [summary, setSummary] =useState(null);

    async function handleSubmit(evt) {
        evt.preventDefault();
        setErrors([]);
        setSummary([]);
        setPending(true);

        const linkResult = await link(profileInput);
        if (!linkResult.ok) {
            setErrors(linkResult.errors);
            setPending(false);
            return;
        }

        const importResult = await doImport();
        if (!importResult.ok) {
            setErrors(importResult.errors);
            setPending(false);
            return;
        }

        setSummary(importResult.summary);
    }    
}

export default LinkSteam;