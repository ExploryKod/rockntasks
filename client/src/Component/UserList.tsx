import {useEffect, useState } from "react";
import type { IUser } from "../Types/typeUsers.d.ts";
import useGetUserList from "../Hook/useGetUserList";
import { ConfirmModal } from "./ConfirmModal.tsx";
import UserEmail from "./UserEmail.tsx";
import { useLoggedStore } from '../StateManager/userStore.ts';
import { IconContext } from "react-icons";
import { RiDeleteBin6Line }from "react-icons/ri";
import { FaUserCog } from "react-icons/fa";
import { HiMiniBellAlert } from "react-icons/hi2";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { Tooltip } from "./Tooltip.tsx";
import {UpdateUserModal} from "./UpdateUserModal.tsx";
import useFlashMessage from "../Hook/useFlashMessage.tsx";
import {Loader} from "./Loader.tsx";


export default function UserList() {
  const { admin, username } = useLoggedStore();
  const { toastMessage, createDefaultToastOptions } = useFlashMessage("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const toastOptionsInfo = createDefaultToastOptions({type: 'info', position: 'top-center', autoClose: 3000});
  const [userList, setUserList] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser>();
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const getUserList = useGetUserList();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserList();
        setUserList(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur dans la requête des listes utilisateurs: ", error);
      }
    };

    fetchData()

  },[]);

  const handleDeleteUser = (user: IUser) => {
    setSelectedUser(user);
    setOpenConfirmModal(true);
  };

  const handleUpdateUser = (user: IUser) => {
    setSelectedUser(user);
    setOpenUpdateModal(true);
  };

  const handleAlertAdmin = (user: IUser) => {
    setSelectedUser(user);
    toastMessage("Vous ne pouvez pas encore alerter un administrateur, Nous travaillons sur cette fonctionnalité", toastOptionsInfo);
  };

  const handleAlertComity = (user: IUser) => {
    setSelectedUser(user);
    toastMessage("Vous ne pouvez pas encore alerter le comité, Nous travaillons sur cette fonctionnalité", toastOptionsInfo);
  };


  useEffect(() => {
    // Ajoute un gestionnaire d'événement de clic global lorsque le composant est monté
    setIsLoading(true);
    setOpenConfirmModal(false);
    setOpenUpdateModal(false);
    setSelectedUser(undefined);
  }, []);

  return (
      <>
        {isLoading ? (
            <div className="loader-lists">
              <div className="loader-container">
                <Loader />
              </div>
              <p className={"loader-text"}>Données en attente ...</p>
            </div>
        ): (
            <>
              <div className={"user-list__container"}>
                {!userList || !userList.length ?
                    (<h2 className="category-text"> Aucun utilisateur en vue, vous êtes bien seul...</h2>):
                    (<div className="categories-container"><h2 className="category-text"> Utilisateurs du chat : </h2>

                    </div>)}
                <section className="table-container">
                  <div className="table">
                    {userList && userList.length > 0 && (
                        <div className="table-header">
                          <div>Identifiant</div>
                          <div>Nom</div>
                          <div>Statut</div>
                          <div>Actions</div>
                        </div>)}
                    {/*{(admin === "1" && (user.admin.toString() !== "1" || user.username === username)) ? (*/}
                    {userList && userList.map((user) => (
                        <div key={user.id} className="body-row">
                          <div className="table-row__id">
                            <span className="row__text">Identifiant:&nbsp;</span>
                            <span>{user.id}</span>
                          </div>
                          <div className="table-row__username">
                            <span className="row__text">Pseudo:&nbsp;</span>
                            <span>{user.username ? user.username : "Anonyme"}</span>
                          </div>
                          <div className="table-row__status">
                            <span className="row__text">Statut:&nbsp;</span>
                            <span>{user.admin.toString() === "1" ? "Administrateur" : "Utilisateur"}</span></div>
                          <div className="table-row__actions">
                            {((admin === "1" && user.admin.toString() !== "1") || user.username === username) ? (
                                <>
                                  <Tooltip content="Supprimer" direction="top">
                                    <IconContext.Provider value={{ color: "#de392a", className: "trash-icon"}}>
                                      <div>
                                        <button aria-label="Supprimer utilisateur"  type="button" className="btn-reset" onClick={() => handleDeleteUser(user)}>
                                          <RiDeleteBin6Line className={"trash-icon"} />
                                        </button>
                                      </div>
                                    </IconContext.Provider>
                                  </Tooltip>
                                  <Tooltip content="Modifier" direction="top">
                                    <IconContext.Provider value={{ color: "blue", className: "update-icon" }}>
                                      <div>
                                        <button aria-label="Modifier utilisateur"  type="button" className="btn-reset" onClick={() => handleUpdateUser(user)} >
                                          <FaUserCog className={"update-icon"} />
                                        </button>
                                      </div>
                                    </IconContext.Provider>
                                  </Tooltip>
                                </>): (
                                <>
                                  <div>
                                    {admin !== "1" ? (
                                        <Tooltip content="Signaler" direction="top">
                                          <IconContext.Provider value={{ color: "#de392a", className: "trash-icon"}}>
                                            <button aria-label="alerter un admin" type="button" className="btn-reset" onClick={() => handleAlertAdmin(user)}>
                                              <HiMiniBellAlert className={"trash-icon"} />
                                            </button>
                                          </IconContext.Provider>
                                        </Tooltip>
                                    ):(
                                        <Tooltip content="Signaler au comité" direction="top">
                                          <IconContext.Provider value={{ size: "20", color: "#28a745", className: "comity-icon"}}>
                                            <button aria-label="alerter un utilisateur" type="button" className="btn-reset" onClick={() => handleAlertComity(user)}>
                                              <IoPeopleCircleOutline className={"trash-icon"} />
                                            </button>
                                          </IconContext.Provider>
                                        </Tooltip>
                                    )}
                                  </div>
                                </>
                            )}
                            <div>
                              {(user.email && username !== user.username) && <UserEmail email={user.email} receiver={user.username} />}
                            </div>
                          </div>
                        </div>
                    ))}
                    {(openConfirmModal && selectedUser) && (
                        <ConfirmModal
                            userList={userList}
                            setUserList={setUserList}
                            selectedUser={selectedUser}
                            setOpenConfirmModal={setOpenConfirmModal}
                            title={"Supprimer un utilisateur"}
                        />
                    )}
                    {(openUpdateModal && selectedUser) &&
                        (<UpdateUserModal
                                userList={userList}
                                setUserList={setUserList}
                                selectedUser={selectedUser}
                                setOpenUpdateModal={setOpenUpdateModal}
                                title={"Modifier un utilisateur"}
                            />
                        )}
                  </div>
                </section>
              </div>
            </>
        )}
   </>
  );
}

