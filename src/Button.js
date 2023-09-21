const Button = ({children, onClick, className, ...props}) => <button {...props} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded ${className}`} onClick={onClick}>{children}</button>

export default Button;
