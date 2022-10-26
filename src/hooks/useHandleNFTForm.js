import React, {useContext, useState} from 'react';
import {Context} from "../store";
import useHandleNFT from "./useHandleNFT";
import useCommon from "./useCommon";

const useHandleNftForm = ({item, onRequestClose, callback}) => {
    const [{user}] = useContext(Context);
    const {getChainName} = useCommon();

    const defaultFormData = {
        image: null,
        switcher: "0",
        provider: user?.provider,
        profileName: item?.profileName ?? "",
        aboutMe: item?.aboutMe ?? "",
        chain: getChainName(),
        links: item?.links?.length > 0 ? item?.links : [
            {trait_type: "", value: ""},
            {trait_type: "", value: ""},
            {trait_type: "", value: ""},
            {trait_type: "", value: ""},
        ],
    }

    const [formData, setFormData] = useState(defaultFormData)
    const [isSwitcherOn, setIsSwitcherOn] = useState(false)
    const [selectedToken, setSelectedToken] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [isUploadError, setIsUploadError] = useState(false)
    const [isLoader, setIsLoader] = useState(false)
    const [isMintDisabled, setIsMintDisabled] = useState(true)


    const handleUploadError = () => {
        setIsLoader(false);
        setIsUploadError(true);
        setFormData({
            ...formData,
            image: null
        })
        setImagePreview(null);
    }

    const handleLoader = (status) => setIsLoader(status)
    const handleNft = useHandleNFT({item, onRequestClose, callback, handleLoader, handleUploadError})

    const onImageChanged = (event) => {
        if (event.target.files[0]) {
            setIsUploadError(false);

            setFormData({
                ...formData,
                image: event.target.files[0]
            })

            setImagePreview(URL.createObjectURL(event.target.files[0]))
            setIsMintDisabled(false)
        } else {
            setFormData({
                ...formData,
                image: null
            })
            setImagePreview(null)
            setIsMintDisabled(true)
        }
    }

    const onInfoChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const onLinksChange = (event, key) => {
        const linkItem = formData.links[key]

        const newLinkItem = {
            ...linkItem,
            [event.target.name]: event.target.value
        }

        const newLinksArr = [
            ...formData.links.slice(0, key),
            newLinkItem,
            ...formData.links.slice(key + 1)
        ]

        setFormData({
            ...formData,
            links: newLinksArr
        })
    }

    const onSwitcherChange = (val) => {
        setFormData({
            ...formData,
            switcher: `${+val}`
        })
    }

    const addLinkItem = () => {
        setFormData({
            ...formData,
            links: [...formData.links, {trait_type: "", value: ""}]
        })
    }

    const onItemCreate = async () => {
        setIsUploadError(false);

        const newFormData = new FormData()

        for (const key in formData) {
            if (key === "links") {
                newFormData.append(`${key}[]`, JSON.stringify(formData[key]))
            } else {
                newFormData.append(key, formData[key])
            }
        }

        await handleNft.mintNFT(newFormData, selectedToken)
    }

    const onInfoUpdate = async () => {
        setIsUploadError(false);

        await handleNft.updateNFTInfo({...formData, itemID: item?._id}, selectedToken)
    }

    const onPhotoUpdate = async () => {
        setIsUploadError(false);

        const newFormData = new FormData()

        newFormData.append("image", formData.image)
        newFormData.append("isWatermark", formData.switcher)
        newFormData.append("itemID", item?._id)

        await handleNft.updateNFTPhoto(newFormData, selectedToken)
    }

    return {
        formData,
        imagePreview,
        isUploadError,
        isLoader,
        isMintDisabled,
        isSwitcherOn,
        selectedToken,
        setIsSwitcherOn,
        setSelectedToken,
        onImageChanged,
        onItemCreate,
        onInfoUpdate,
        onLinksChange,
        onInfoChange,
        onPhotoUpdate,
        addLinkItem,
        onSwitcherChange,
    };
};

export default useHandleNftForm;