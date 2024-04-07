import { Helmet } from 'react-helmet-async';

import CreatePledgeView from 'src/sections/CreatePledgeView';

// ----------------------------------------------------------------------

export default function CreatePledgesPage() {
  return (
    <>
        <Helmet>
        <title> Create Pledges </title>
        </Helmet>

        <CreatePledgeView/>
    </>
  );
}
