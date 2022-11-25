import authHook from "../hooks/authHook"

export default function Main() {
    const { token } = authHook();
    return (
        <h1>Main Page</h1>
    )
};