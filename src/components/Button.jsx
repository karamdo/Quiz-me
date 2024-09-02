export default function Button({ children, className, onClick, disabled }) {
    return (
        <button
            onClick={onClick}
            className={`border border-font rounded-lg transition-all px-3 py-1 shadow-md shadow-black ${className}`}
            disabled={disabled}
            dangerouslySetInnerHTML={{ __html: `${children}` }}
        ></button>
    );
}
