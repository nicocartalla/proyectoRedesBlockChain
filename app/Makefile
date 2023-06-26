

run_node1:
	@echo "Running node1"
	npm run dev
run_node2:
	@echo "Running node2"
	HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev
run_node3:
	@echo "Running node3"
	HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev