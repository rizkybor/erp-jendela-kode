'use client';
import { useState, useMemo } from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

// project-imports
import MailContent from 'sections/apps/mail/MailContent';
import MailDrawer from 'sections/apps/mail/MailDrawer';
import { useMailDrawer } from 'sections/apps/mail/useMailDrawer';
import { mailList } from 'sections/apps/mail/data/mail-list';

// drawer content element
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: 'calc(100% - 300px)',
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shorter
  }),
  marginLeft: `-${300}px`,
  [theme.breakpoints.down('xl')]: {
    paddingLeft: 0,
    marginLeft: 0
  },
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shorter
    }),
    marginLeft: 0
  })
}));

const getAllMails = () =>
  Object.values(mailList).flatMap((box) =>
    Array.isArray(box) ? box : Object.values(box).flatMap((arr) => (Array.isArray(arr) ? arr : []))
  );

const hasLabel = (mail, labelName) =>
  Array.isArray(mail.label)
    ? mail.label.some((l) => String(l).toLowerCase() === labelName)
    : typeof mail.label === 'string' && mail.label.toLowerCase() === labelName;

const hasFlag = (mail, ...keys) => keys.some((k) => Boolean(mail?.[k]) || String(mail?.[k]).toLowerCase() === 'true');

const labelFilters = {
  starred: (mail) => hasFlag(mail, 'isStarred', 'starred'),
  important: (mail) => hasFlag(mail, 'isImportant', 'important') || hasLabel(mail, 'important'),
  promotions: (mail) => hasLabel(mail, 'promotions'),
  forums: (mail) => hasLabel(mail, 'forums')
};

// ==============================|| MAIL PAGE ||============================== //

export default function Mail() {
  const { openDrawer, setOpenDrawer, toggleDrawer } = useMailDrawer(true);
  const [selectedMenu, setSelectedMenu] = useState('inbox');
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const openDetail = () => setIsDetailOpen(true);
  const closeDetail = () => setIsDetailOpen(false);

  const handleSelect = (menu) => setSelectedMenu(menu.toLowerCase());

  const mails = useMemo(() => {
    if (selectedMenu in labelFilters) {
      return getAllMails().filter(labelFilters[selectedMenu]);
    }
    if (selectedMenu === 'inbox') {
      return mailList.inbox;
    }
    const category = mailList[selectedMenu];
    return Array.isArray(category) ? category : Object.values(category || {}).flatMap((arr) => (Array.isArray(arr) ? arr : []));
  }, [selectedMenu]);

  const getCount = (label) => {
    const key = label.toLowerCase();
    if (key in labelFilters) {
      return getAllMails().filter(labelFilters[key]).length;
    }
    const category = mailList[key];
    if (key === 'inbox' && typeof category === 'object' && category !== null) {
      return Object.keys(category).length;
    }
    return Array.isArray(category) ? category.length : 0;
  };

  return (
    <Stack direction="row" sx={{ gap: openDrawer ? 2.5 : 0, overflow: 'hidden' }}>
      <MailDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        onSelect={handleSelect}
        getCount={getCount}
        closeDetail={closeDetail}
      />
      <Main open={openDrawer}>
        <MailContent
          toggleDrawer={toggleDrawer}
          mails={mails}
          selectedMenu={selectedMenu}
          isDetailOpen={isDetailOpen}
          openDetail={openDetail}
          closeDetail={closeDetail}
        />
      </Main>
    </Stack>
  );
}
