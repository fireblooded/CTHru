import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import DetailedView from '../sections/DetailedView';


// ----------------------------------------------------------------------

export default function DetailsPage() {
    const { uid } = useParams();
  
    return (
    <>
      <Helmet>
        <title> Details </title>
      </Helmet>

      <DetailedView uid={uid}/>
    </>
  );
}
