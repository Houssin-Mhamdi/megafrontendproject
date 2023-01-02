import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "../../redux/slice/users/userSlice";
import AccountList from "./AccountList";
import AccountSummary from "./AccountSummary";

const MainDashBoard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileAction())
  }, [dispatch])

  const { loading, error, profile } = useSelector((state) => state?.users)

  return (
    <>
      {loading ?
        (<h2 className="text-center text-green-600 text-lg mt-5">Loading ... </h2>)
        : error ? (<h2 className="text-center text-red-600 text-lg mt-5">{error}</h2>)
          : (<>
            <AccountSummary profile={profile} />
            <AccountList profile={profile} />
          </>)}

    </>
  );
};

export default MainDashBoard;
