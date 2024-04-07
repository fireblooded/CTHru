import { Helmet } from 'react-helmet-async';

import PledgesView from '../sections/PledgesView';


// ----------------------------------------------------------------------

export default function PledgesPage() {
  return (
    <>
      <Helmet>
        <title> Pledges </title>
      </Helmet>

      <PledgesView />
    </>
  );
}
