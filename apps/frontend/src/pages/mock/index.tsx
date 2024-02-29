import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { SyncResponseSection } from "../../components/SyncResponseSection";
import { AsyncResponseSection } from "../../components/AsyncResponseSection";
import { MockProvider } from "../../utils/context";
import { Outlet } from "react-router-dom";
import { useMock } from "../../utils/hooks";

export const Mock = () => {
	return (
		<MockProvider>
			<Container sx={{ py: 2 }}>
				<Grid container spacing={2}>
					<Grid item xs={12} lg={8}>
						<Outlet />
					</Grid>
					<Grid container item xs={12} lg={4} spacing={2}>
						<Grid item xs={12} sm={6} lg={12}>
							<SyncResponseSection/>
						</Grid>
						<Grid item xs={12} sm={6} lg={12}>
							<AsyncResponseSection />
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</MockProvider>
	);
};
