import React, { forwardRef, useImperativeHandle } from "react";

const Modal = forwardRef((props, ref) => {
    const [showModal, setShowModal] = React.useState(false);
    useImperativeHandle(ref, () => ({
        toggleModal() {
            setShowModal(!showModal);
        }
    }));
    return (
        <>

            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative bg-main rounded w-auto my-6 mx-auto" style={{ width: props.width,maxWidth: "100vw" }}>
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="modal">
                                    {props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
});

export default Modal;