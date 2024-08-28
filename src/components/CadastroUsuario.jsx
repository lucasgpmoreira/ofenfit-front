import {IconChevronDown, IconChevronUp, IconCircleCheck, IconExclamationCircle, IconLoader2} from "@tabler/icons-react";
import {useState} from "react";
import {postUser} from "../api/api.js";

const CadastroUsuario = () => {
    const [openedCadastro, setOpenedCadastro] = useState(false)
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [cpf, setCpf] = useState("")
    const [dataNascimento, setDataNascimento] = useState("")
    const [diasOfensiva, setDiasOfensiva] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        setErrorMessage(false);
        setSuccessMessage(false);

        const fetchUserData = async () => {
            try {
                const response = await postUser(nome, email, cpf, dataNascimento, diasOfensiva);
                console.log(response);
                setLoading(false);
                setSuccessMessage(true);
            } catch (err) {
                console.log(err);
                setLoading(false);
                setErrorMessage(true);
            }
        };

        fetchUserData();

        console.log(nome, email, cpf, dataNascimento);
    }

    return (
        <>
            <button
                onClick={() => setOpenedCadastro(!openedCadastro)}
                className={"bg-customGreen-mid gap-0.5 text-amber-50 px-2 py-1 flex items-center rounded-md font-semibold mb-1"}>
                Cadastrar novo player
                {openedCadastro ? <IconChevronUp size={20}/> : <IconChevronDown size={20}/>}
            </button>
            <div
                className={`p-4 border-gray-300 rounded border-2 w-100 ${openedCadastro ? "scale-y-100" : "scale-y-0"} transform transition-all origin-top duration-500 ease-in-out`}>
                <form className={"flex flex-col gap-2"} onSubmit={handleSubmit}>
                    <div className={"flex gap-2"}>
                        <input type="text" placeholder="Nome" className={"border-2 rounded-md p-1 w-full"}
                               onChange={(e) => setNome(e.target.value)}/>
                        <input type="email" placeholder="Email" className={"border-2 rounded-md p-1 w-full"}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className={"flex gap-2"}>
                        <input type="text" placeholder="CPF" className={" w-full border-2 rounded-md p-1"}
                               onChange={(e) => setCpf(e.target.value)}/>
                        <input type="date" placeholder="Data de nascimento"
                               className={" w-full border-2 rounded-md p-1"} onChange={(e) => {
                            const dataN = e.target.value;
                            const [year, month, day] = dataN.split('-');
                            setDataNascimento(`${day}/${month}/${year}`);
                        }}/>
                        <input type={"number"} min={0} placeholder={"Dias de ofensiva"}
                               className={"w-full border-2 rounded-md p-1"}
                               onChange={(e) => setDiasOfensiva(e.target.value)}/>
                    </div>


                    <button type="submit"
                            className={"bg-customGreen-mid text-amber-50 px-2 py-1 rounded-md font-semibold flex"}>
                        Cadastrar
                        {loading && <div className={"animate-spin ml-2"}><IconLoader2/></div>}
                    </button>


                    {successMessage && <div
                        className={"text-green-900 bg-green-200 p-2 rounded-md border-2 border-green-600 flex gap-2"}>
                        <IconCircleCheck/> Usuário cadastrado com sucesso!</div>}
                    {errorMessage &&
                        <div className={"text-red-500 bg-red-100 p-2 rounded-md border-2 border-red-300 flex gap-2"}>
                            <IconExclamationCircle/> Erro ao cadastrar usuário!</div>}

                </form>
            </div>
        </>
    );
};

export default CadastroUsuario;