import { createClient } from '@/utils/supabase/server'
import { logout } from '@/app/auth/actions'
import { redirect } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function Dashboard() {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    redirect('/login')
  }

  const { data: announcements, error: dbError } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-blue-950 text-foreground">
      <nav className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="font-semibold text-sm leading-none">Employee Portal</h1>
              <p className="text-xs text-muted-foreground mt-1">{user.email}</p>
            </div>
          </div>
          <form action={logout}>
            <Button variant="outline" size="sm" className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors">
              Sign out
            </Button>
          </form>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Announcements</h2>
            <p className="text-muted-foreground mt-2">Latest updates and news from the team.</p>
          </div>
        </div>
        
        {dbError && (
          <div className="p-4 rounded-md bg-destructive/10 border border-destructive/20 text-destructive mb-6">
            Failed to load announcements. Please try again later.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {announcements?.map((item) => (
            <Card 
              key={item.id} 
              className="bg-card border-border hover:border-primary/50 transition-all duration-200 hover:shadow-md group flex flex-col"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-4">
                  <CardTitle className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                  <span className="shrink-0 text-xs font-medium px-2 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
                    {new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="grow">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.content}
                </p>
              </CardContent>
              <CardFooter className="pt-0 pb-4">
                <div className="text-xs text-muted-foreground/50 flex items-center gap-2">
                   <span>Posted by Admin</span>
                </div>
              </CardFooter>
            </Card>
          ))}
          
          {announcements?.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center border border-dashed border-border rounded-lg bg-card/50">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <span className="text-2xl">📭</span>
              </div>
              <h3 className="text-lg font-medium">No announcements yet</h3>
              <p className="text-muted-foreground text-sm max-w-sm mt-2">
                Check back later for company updates and news.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}