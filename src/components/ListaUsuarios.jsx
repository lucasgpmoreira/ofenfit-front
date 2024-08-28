import {useEffect, useState} from "react";
import {addDay, deleteUser, freezeUser, getUsers, resetUser, unfreezeUser} from "../api/api.js";
import {IconCircleOff, IconFlame, IconIceCream, IconMoodEdit, IconTrashX} from "@tabler/icons-react";
import EdicaoUsuario from "./EdicaoUsuario.jsx";

const LoadingPlaceholder = () => {
    return (
        <div className={"w-full h-40 flex items-center justify-center"}>
            <div className="animate-pulse w-10/12 flex gap-2">
                <div className={"bg-green-200 w-10 h-10 rounded-full"}></div>
                <div className={"bg-green-200 w-20 h-10"}></div>
                <div className={"bg-green-200 w-full h-10"}></div>
            </div>
        </div>
    );

}

const ListaUsuarios = ({refresh, setRefresh, listaUsuarios, setListaUsuarios}) => {



    return (
        <div>
            {listaUsuarios.length === 0 ? <LoadingPlaceholder/> : listaUsuarios.map((usuario) => {
                return (
                    <div key={usuario.id}>
                        <div className={"flex md:flex-row flex-col gap-4 justify-center " +
                            "items-center p-4 border-2 border-gray-300 rounded-md mb-1"}>
                            <div className={"bg-green-50 w-fit p-2 rounded-lg border-2 border-green-100"}>
                                <div className={"mb-2"}>
                                    <div className={"bg-green-200 w-10 h-10 rounded-full"}></div>
                                    <div>
                                        <h1 className={"font-semibold"}>{usuario.nome}</h1>
                                        <p>{usuario.email}</p>
                                    </div>
                                </div>

                                <div className={"flex gap-1 mb-1 w-full"}>
                                    <button
                                        onClick={() => deleteUser(usuario.id).then(() => setRefresh(!refresh))}
                                        className={"text-white flex w-full h-full gap-0.5 items-center justify-center bg-blue-600 rounded font-medium py-1 px-2"}>
                                        <IconTrashX size={20}/>
                                        Remover
                                    </button>

                                    <button
                                        onClick={() => {
                                            usuario.congelado ? unfreezeUser(usuario.id).then(() => setRefresh(!refresh)) :
                                                freezeUser(usuario.id).then(() => setRefresh(!refresh))
                                        }}
                                        className={"text-white flex w-full w-min-30 h-full gap-0.5 items-center justify-center bg-blue-600 rounded font-medium py-1 px-2"}>
                                        <IconIceCream size={20}/>
                                        {usuario.congelado ? "Descongelar" : "Congelar"}
                                    </button>
                                </div>
                                <div className={"flex gap-1 w-full"}>
                                    <button
                                        onClick={() => {
                                            usuario.diasDeOfensiva > 0 && resetUser(usuario.id).then(() => setRefresh(!refresh))
                                        }}
                                        className={"text-white h-full w-fit flex gap-0.5 justify-center items-center bg-customGreen-mid rounded font-medium py-1 px-2"}>
                                        <IconCircleOff size={20}/>
                                        Zerar
                                    </button>

                                    <button
                                        onClick={() => addDay(usuario.id).then(() => setRefresh(!refresh))}
                                        className={"text-white h-full w-full flex justify-center gap-0.5 items-center bg-customGreen-mid rounded font-medium py-1 px-2"}>
                                        <IconFlame size={20}/>
                                        Adicionar
                                    </button>
                                </div>
                            </div>
                            <div className={"flex flex-wrap w-full"}>
                                {usuario.diasDeOfensiva <= 0 ? "" : (
                                    [...Array(usuario.diasDeOfensiva)].map((e, i) => {
                                            return <img key={i} className={`${usuario.congelado && ("grayscale")}`}
                                                        width={"55px"}
                                                        src={"https://em-content.zobj.net/source/microsoft-teams/363/fire_1f525.png"}
                                                        alt={"fogo"}/>
                                        }
                                    )
                                )}
                            </div>
                        </div>
                        <EdicaoUsuario usuario={usuario} refresh={refresh} setRefresh={setRefresh}/>
                    </div>

                );
            })}
        </div>
    );
};

export default ListaUsuarios;