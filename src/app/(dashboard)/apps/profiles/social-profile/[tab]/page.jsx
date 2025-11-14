import PropTypes from 'prop-types';
import SocialProfile from 'views/apps/SocialProfile';

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({ params }) {
  const { tab } = await params;

  return <SocialProfile tab={tab} />;
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const response = ['profile', 'friends', 'friend-requests', 'gallery'];

  return response.map((tab) => ({
    tab: tab
  }));
}

Page.propTypes = { params: PropTypes.object };
