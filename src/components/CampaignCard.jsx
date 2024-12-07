import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const CampaignCard = ({campaign,loadedcampaigns,setLoadedcampaigns}) => {
    const { _id, name, chef, taste, photo } = campaign;

    const handleDelete = _id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://crowdcube-server-two.vercel.app/campaign/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                      
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });

                            const remainingcampaigns = loadedcampaigns.filter(campaign => campaign._id !== _id);
                            setLoadedcampaigns(remainingcampaigns);

                        }
                    })

            }
        });
    }

    return (
        <div className="card lg:card-side bg-base-100 shadow-xl">
            <figure>
                <img
                    src={photo}
                    alt="campaign" />
            </figure>
            <div className="flex w-full m-4 items-center justify-between">
                <div>
                    <p>Name: {name}</p>
                    <p>Chef: {chef}</p>
                    <p>Taste: {taste}</p>
                </div>
                <div className="card-actions justify-end join join-vertical">
                    <button className="btn join-item">View</button>
                    <Link to={`/updatecampaign/${_id}`}>
                        <button className="btn join-item">Edit</button>
                    </Link>
                    <button
                        onClick={() => handleDelete(_id)}
                        className="btn join-item bg-red-500">X</button>
                </div>
            </div>
        </div>
    );
};

export default CampaignCard;