import { PRESET_AVATARS } from '../services/users';

function Avatar({ user, size = 40 }) {
    const style = { width: size, height: size };

    if (user.avatar === 'STEAM' && user.steamAvatarUrl) {

        return <img src={user.steamAvatarUrl} alt="" className="rounded-circle" style={style} />;
    }

    return (
        <span className="rounded-circle bg-secondary text-white d-inline-flex align-items-center justify-content-center" style={style}>
            {PRESET_AVATARS[user.avatar] ?? user.displayName.charAt(0).toUpperCase()}
        </span>
    );
}

export default Avatar;
