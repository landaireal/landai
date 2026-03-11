import { useLanguage } from '../context/LanguageContext';
import UserProfile from '../components/UserProfile';
import SEO from '../components/SEO';

export default function UserProfilePage() {
  const { language } = useLanguage();

  return (
    <>
      <SEO 
        title={language === 'ar' ? 'الملف الشخصي - Land AI' : 'User Profile - Land AI'}
        description={language === 'ar' ? 'إدارة ملفك الشخصي' : 'Manage your profile'}
      />
      
      <div className="min-h-screen pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            {language === 'ar' ? 'ملفي الشخصي' : 'My Profile'}
          </h1>
          <UserProfile />
        </div>
      </div>
    </>
  );
}
