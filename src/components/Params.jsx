export default function Params({ children, paramsName, setParams, params, items }) {
    return (
        <div>
            <label>{children}</label>
            <select
                className="text-black flex-1 rounded-lg px-2"
                onChange={(e) =>
                    setParams((params) => ({ ...params, [paramsName]: e.target.value }))
                }
                value={params[paramsName]}
            >
                {items.map((item) => (
                    <option
                        value={item.id}
                        key={item.id}
                        dangerouslySetInnerHTML={{ __html: `${item.name}` }}
                    ></option>
                ))}
            </select>
        </div>
    );
}
