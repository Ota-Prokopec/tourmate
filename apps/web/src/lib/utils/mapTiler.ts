import { PUBLIC_MAP_TILER_API_KEY } from '$env/static/public';
import { mapTiler } from '@app/utils';

export default mapTiler(PUBLIC_MAP_TILER_API_KEY);
