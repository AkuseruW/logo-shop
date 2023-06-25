import Aside from '@/components/admin/layouts/Sidebar/aside';
import HeaderAdmin from '@/components/admin/layouts/header';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex h-screen overflow-hidden">
        <Aside />
        <div className="flex  flex-col flex-1 overflow-hidden">
          <HeaderAdmin />
          <div className="flex-1 overflow-y-auto">
            <div className=" mx-auto px-4 ">
              {children}
            </div>
          </div>
        </div>
      </div>
  );
}
